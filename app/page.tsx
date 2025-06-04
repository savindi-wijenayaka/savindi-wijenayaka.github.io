import { Container, Heading, Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";

export default function Home() {
  return (
    <Container p={4}>
      <Heading as={"h1"}>Experience</Heading>
      <Tabs.Root defaultValue="members" variant={"outline"} orientation="vertical">
            <Tabs.List>
              <Tabs.Trigger value="members">
                <LuUser />
                Members
              </Tabs.Trigger>
              <Tabs.Trigger value="projects">
                <LuFolder />
                Projects
              </Tabs.Trigger>
              <Tabs.Trigger value="tasks">
                <LuSquareCheck />
                Settings
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="members">
              Manage your team members
            </Tabs.Content>
            <Tabs.Content value="projects">Manage your projects</Tabs.Content>
            <Tabs.Content value="tasks">
              Manage your tasks for freelancers
            </Tabs.Content>
          </Tabs.Root>
    </Container>
  );
}
