export function clearRef(ref) {
  while (ref.current.firstChild) {
    ref.current.removeChild(ref.current.firstChild);
  }
}
