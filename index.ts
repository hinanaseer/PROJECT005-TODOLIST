import inquirer from 'inquirer';

interface TodoItem {
  task: string;
  completed: boolean;
}

const todoList: TodoItem[] = [];

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: ['Add Task', 'View List', 'Mark as Completed', 'Exit'],
  });

  switch (action) {
    case 'Add Task':
      await addTask();
      break;
    case 'View List':
      viewList();
      break;
    case 'Mark as Completed':
      await markCompleted();
      break;
    case 'Exit':
      console.log('Goodbye!');
      return;
  }

  mainMenu();
};

const addTask = async () => {
  const { task } = await inquirer.prompt({
    type: 'input',
    name: 'task',
    message: 'Enter the task:',
  });

  todoList.push({ task, completed: false });
  console.log('Task added successfully!');
};

const viewList = () => {
  console.log('*** To-Do List ***');
  todoList.forEach((item, index) => {
    console.log(`${index + 1}. [${item.completed ? 'x' : ' '}] ${item.task}`);
  });
  console.log('******************');
};

const markCompleted = async () => {
  const { index } = await inquirer.prompt({
    type: 'number',
    name: 'index',
    message: 'Enter the task number to mark as completed:',
  });

  if (index < 1 || index > todoList.length) {
    console.log('Invalid task number. Please try again.');
    return;
  }

  todoList[index - 1].completed = true;
  console.log('Task marked as completed!');
};

mainMenu();
