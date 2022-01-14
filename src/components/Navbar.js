import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter} from 'next/router'
import  Link  from 'next/link'
export const Navbar = () => {

  const router = useRouter()
  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Link href = "/">
          <img src='/favicon.ico' alt="icono vercel"
          style={{cursor:'pointer'}}
          />
          </Link>
          
        </Menu.Item>
        <Menu.Item><h1>Vercel</h1></Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item >
            <Button color="orange" size="mini" onClick={() => router.push('/tasks/new')}>New Task</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
