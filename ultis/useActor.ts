export const useActor = () => {
  const actor = window.location.pathname.split('/')[1]
  return actor
}
