import { useParams } from "react-router-dom";

export default function Commune() {
  const { communeId } = useParams();
  return <div>{communeId}</div>;
}
