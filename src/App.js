import './App.css';
import { Link as L, useParams, Navigate } from 'react-router-dom'


const projects = [
  {
    id: 1,
    name: "Harry Potter",
    categoria: "Masculino"
  },
  {
    id: 2,
    name: "Percy Jackson",
    categoria: "Feminino"
  },
  {
    id: 3,
    name: "Maromba",
    categoria: "Infantil"
  },
  {
    id: 4,
    name: "Marombaaaa",
    categoria: "Infantiladasas"
  }
]

function Link({ path, text }) {
  return <L to={path}> {text} </L>
}

function Indice() {
  return (
    <div>

      Pagina inicial (/)
      <Link path="/projects" text="projetos"> oi</Link>
    </div>

  );
}


export default Indice;


export function Projects() {
  return (
    <div>
      Projetos (/projects) <br />
      <ul>
        {
          projects.map(p => {
            return <li key={p.id}>
              <Link path={`${p.id}`} text={`projeto ${p.name}`} />
            </li>

          })

        }

      </ul>


      <Link path="/" text="voltar"> oi</Link>
    </div>
  );


}


export function Project() {
  const { idProject } = useParams()
  const project = projects.find(p => p.id === Number(idProject))
  if(!project) return <Navigate replace to="/" /> 
  
  return (
    <div id="categorias">
      Projeto {project.name} e {project.categoria}
    </div>


  );


}