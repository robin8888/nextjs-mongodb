

import { Button, Container, Card, Grid, Image} from "semantic-ui-react";
import {useRouter} from 'next/router'
export default function Home({data}) {

  const router = useRouter()
  if (data.length === 0)
   return (
    <Grid centered verticalAlign="middle" columns={1} style={{ height:'80vh'}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
            <h1> No hay Tareas aun </h1>
            <Image centered src="https://cdn.iconscout.com/icon/premium/png-256-thumb/no-data-found-1965030-1662565.png" alt='no hay datos'/>
            <Button color= 'green' onClick={()=>router.push('tasks/new')}>Create a Task</Button>
        </Grid.Column>
        
      </Grid.Row>
    </Grid>
  )
    
  
  return (
    <Container style={{padding:'20px'}}>
      <Card.Group itemsPerRow={4}>
        {
          data.map(({title, description, _id }) => (
            <Card key={_id}>
                <Card.Content>
                  <Card.Header>
                    {title}
                  </Card.Header>
                  <p>{description}</p>
                </Card.Content> 
                <Card.Content extra>
                  <Button
                  onClick={()=> router.push(`/tasks/${_id}`)}
                  primary>
                    View
                  </Button>
                  <Button
                  onClick={()=> router.push(`/tasks/${_id}/editTask`)}
                  secondary>
                    Edit
                  </Button>
                </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    </Container>
  );
}
export const getServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/task");
  const data = await res.json();
  
  return {
    props: {data},
  };
};
