const stack = [];

export function registerModal(id, handlers = {}) {
  stack.push({ id, handlers });
}

export function unregisterModal(id) {
  const index = stack.findIndex((m) => m.id === id);
  if (index !== -1) stack.splice(index, 1);
}

export function getTopModal() {
  return stack[stack.length - 1];
}

export function hasModal() {
  return stack.length > 0;
}
