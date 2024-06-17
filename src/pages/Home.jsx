import { ClientsTable } from "../components/ClientsTable";
import { NavBar } from "../components/NavBar";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <ClientsTable />
    </div>
  )
}