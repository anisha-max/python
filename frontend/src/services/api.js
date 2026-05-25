const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

// export async function fetchProjects() {
//   const response = await fetch(`${API_BASE}/projects`);
//   if (!response.ok) {
//     throw new Error(`Unable to fetch projects: ${response.status} ${response.statusText}`);
//   }
//   return response.json();
// }
export async function fetchProjects() {

  const response = await fetch(
    `${API_BASE}/projects`
  );

  console.log("STATUS:", response.status);

  const data = await response.json();

  console.log("DATA:", data);

  return data;
}
export function slugify(text) {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}


export const createProject = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/projects", {
      method: "POST",
      body: data,
    });

    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};