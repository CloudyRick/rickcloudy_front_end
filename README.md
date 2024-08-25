# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Dockerfile Documentation

This documentation provides an overview of the Dockerfile used to build a Node.js application through a multi-stage build process. The Dockerfile is structured to optimize the build process, leveraging the lightweight Alpine Linux base image and organizing commands for efficient layer caching.

## Overview

The Dockerfile is designed with a multi-stage build process to keep the final image size small while maintaining the build environment's necessary tools and dependencies.

## Stage 1: Build the Application

### Base Image

- **`FROM node:16-alpine AS build`**: This line sets the base image for the build stage to `node:16-alpine`, a minimal version of the Node.js 16 image based on Alpine Linux. The `AS build` syntax names this stage as `build`, allowing for its artifacts to be used in subsequent stages if necessary.

### Setting the Working Directory

- **`WORKDIR /app`**: Establishes `/app` as the working directory inside the Docker image. All commands that follow are executed in this directory, providing a consistent and isolated environment for the application build.

### Copying Package Files

- **`COPY package*.json ./`**: This command copies both `package.json` and `package-lock.json` (if present) into the Docker image's working directory. These files define the project's dependencies, which are installed in the next step.

#### Note for Yarn Users

If Yarn is used as the package manager, the `yarn.lock` file should also be copied into the image to ensure consistent dependency resolution. Replace the `npm install` command with `yarn install` to install dependencies using Yarn.

## Conclusion

This Dockerfile provides a solid foundation for building Node.js applications using Docker, emphasizing efficiency and minimalism. By carefully structuring commands and utilizing Docker's caching mechanisms, the build process is optimized for speed and reliability.
