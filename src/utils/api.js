import axios from 'axios';

const CACHE_DURATION = 60 * 60 * 1; 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchQuestions = async () => {
  const cachedQuestions = localStorage.getItem('questions');
  const cachedTimestamp = localStorage.getItem('questionsTimestamp');

  if (cachedQuestions && cachedTimestamp) {
    const cacheAge = Date.now() - parseInt(cachedTimestamp, 10);
    if (cacheAge < CACHE_DURATION) {
      console.log('Menggunakan pertanyaan dari cache.');
      return JSON.parse(cachedQuestions);
    } else {
      console.log('Cache kedaluwarsa. Mengambil data baru.');
    }
  }

  try {
    const response = await axios.get(
      'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple'
    );

    // Simpan data baru ke cache bersama timestamp
    localStorage.setItem('questions', JSON.stringify(response.data.results));
    localStorage.setItem('questionsTimestamp', Date.now().toString());
    console.log('Pertanyaan berhasil diambil dan disimpan ke cache.');

    return response.data.results;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn('Retrying...');
      await delay(2000);
      return fetchQuestions();
    }
    console.error('Gagal mengambil pertanyaan:', error);
    return [];
  }
};
