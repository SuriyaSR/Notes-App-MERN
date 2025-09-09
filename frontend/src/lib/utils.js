export function formatDate(dateString) {
  return dateString ? new Date(dateString).toLocaleDateString("en-US", {
   month: "short", 
   day: "numeric", 
   year: "numeric",
  }) : '';
}