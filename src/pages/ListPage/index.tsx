import { useParams } from "react-router-dom";

export default function ListPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>List Page</h1>
      <p>List ID: {id}</p>
    </div>
  );
}
