module.exports = {
  plugins: [
    {
      rules: {
        'custom-header': (parsed) => {
          const { header } = parsed;
          const regex = /^\[([A-Z]+-\d+)] (fix|feat|docs|refactor|test): (.+)$/;

          if (!regex.test(header)) {
            return [false, `Commit message must follow format: [JIRA-123] fix|feat|docs|refactor|test: description`];
          }

          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-header': [2, 'always'],
  },
};
