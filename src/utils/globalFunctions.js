
// convert date to  Apr 8, 2024 format 
export const formatDate=(dateValue) =>{
  if(!dateValue) return '';
    const date = new Date(dateValue);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options) || '';
  }
  