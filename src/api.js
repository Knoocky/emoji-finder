const xhr = new XMLHttpRequest();

export function get(path) {
  let result;
  xhr.open('GET', path, false);
  xhr.send();
  
  if (xhr.status != 200) {
    result = xhr.status + ': ' + xhr.statusText; 
  } else {
    result = JSON.parse(xhr.response); 
  }

  return result;
}