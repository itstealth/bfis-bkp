export const metadata = {
  title: "Academic Book List | Brookfield International School",
  description:
    "Explore the academic book list at Brookfield International School, providing students with essential resources for effective learning and growth.",
  alternates: {
    canonical: "https://www.bfis.in/books",
  },
};

import BooksClient from "./BooksClient";

export default function BookListPage() {
  return <BooksClient />;
}
