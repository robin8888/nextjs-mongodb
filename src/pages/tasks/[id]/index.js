import Error from "next/error";
import { Grid, Confirm, Button } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
export default function TaskDetail({ task, error }) {
  const { query, push } = useRouter();
 

  const [open, setopen] = useState(false);
  const openConfirm = () => {
    setopen(true);
  };
  const close = () => {
    setopen(false);
  };
  const { title, description } = task && task;
  const deleteTask = async () => {
    const { id } = query;

    try {
      await fetch("http://localhost:3000/api/task/" + id, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    deleteTask();
    close();
    push("/");
  };
  if (error && error.statusCode)
    return (
      <Error statusCode={error.statusCode} title={error.statusTex}></Error>
    );


  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{title}</h1>
          <p>{description}</p>
          <div>
            <Button color="red" onClick={() => openConfirm()}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        open={open}
        onCancel={close}
        onConfirm={handleDelete}
        header="Please Confirm"
        content="Please confirm if you want to delete the task"
      />
    </Grid>
  );
}
export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/task/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: { task },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusTex: "Invalid ID",
      },
    },
  };
}
