# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## 🎯 Usage

### Creating Tasks
1. Click "Add Task" in any column
2. Fill in task details:
   - Title
   - Description
   - Priority
   - Subtasks (optional)

### Managing Tasks
- **Move Tasks**: Drag and drop between columns
- **Edit Tasks**: Click on any task to view/edit details
- **Add Subtasks**: Create subtasks within any task
- **Track Progress**: Monitor subtask completion

### Viewing Analytics
1. Click "Analytics" button in the header
2. View various metrics and charts:
   - Task distribution
   - Priority breakdown
   - Completion rates
   - Overall progress

## 🌈 Key Benefits

### For Teams
- **Enhanced Productivity**
  - Clear task organization
  - Visual progress tracking
  - Priority management
  - Team collaboration support

### For Project Managers
- **Better Oversight**
  - Real-time progress monitoring
  - Analytics dashboard
  - Status tracking
  - Resource allocation insights

### For Developers
- **Clean Architecture**
  - TypeScript for type safety
  - Component reusability
  - Maintainable codebase
  - Modern development practices

## 🛠 Technical Features

### Performance
- Optimized rendering
- Efficient state management
- Local storage persistence
- Smooth animations

### Code Quality
- TypeScript for type safety
- ESLint configuration
- Prettier formatting
- Modern React practices

### Styling
- Tailwind CSS for utility-first styling
- Custom animations
- Responsive design
- Dark theme

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Chart.js for the beautiful charts
- All contributors who help improve this project

## 📧 Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/task-management-board](https://github.com/yourusername/task-management-board)
