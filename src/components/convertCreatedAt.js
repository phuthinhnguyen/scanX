export const convertCreatedAt = (time) => {
    const today = new Date(time);
    return today.toLocaleDateString();
}