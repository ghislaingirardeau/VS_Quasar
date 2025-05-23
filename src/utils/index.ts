export function randomNumber() {
  return Math.round(Math.random() * 100);
}

export function reloadWindow() {
  return window.location.reload();
}

export const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
};

export const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'indigo',
  'pink',
  'purple',
  'slate',
  'teal',
  'orange',
];
