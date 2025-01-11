export const saveProgress = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadProgress = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};
