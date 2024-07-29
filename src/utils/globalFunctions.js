
// convert date to  Apr 8, 2024 format 
export const formatDate = (dateValue) => {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options) || '';
}

/* shuffle array  */

export const shuffleArray = (array) => {
  let newArray = array.slice();
  let currentIndex = newArray.length;
  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    const temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray || [];
}