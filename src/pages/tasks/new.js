import { Button, Form, Grid } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
export default function TaskFormPage() {
  const router = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, seterrors] = useState({
    title: "",
    description: "",
  });
  const validate = () => {
    const errors = {};
    if (!newTask.title) errors.title = "Title is Required";
    if (!newTask.description) errors.description = "Description is Required";

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return seterrors(errors);

    await createNewTask();
    await router.push("/");
  };
  const handleOnchange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  const createNewTask = async () => {
    try {
      await fetch("http://localhost:3000/api/task/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row onSubmit={handleSubmit}>
        <Grid.Column textAlign="center">
          <h1>Create Task</h1>
          <Form>
            <Form.Input
              label="Title"
              placeholder=" Title"
              name="title"
              onChange={handleOnchange}
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleOnchange}
              error={
                errors.description
                  ? { content: "Please enter a Description", pointing: "below" }
                  : null
              }
            />
            <Button color="green">Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
