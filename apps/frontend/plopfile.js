module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Creating new next components',
    prompts: [
      {
        type: 'input',
        name: 'name',
      },
    ],
    actions: () => [
      {
        type: 'add',
        templateFile: 'plop-templates/component/index.hbs',
        path: 'src/components/specific/{{pascalCase name}}/index.ts',
      },
      {
        type: 'add',
        templateFile: 'plop-templates/component/component.hbs',
        path: 'src/components/specific/{{pascalCase name}}/{{pascalCase name}}.tsx',
      },
    ],
  })
}
