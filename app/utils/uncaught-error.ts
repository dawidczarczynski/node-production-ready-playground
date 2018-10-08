export const uncaughtErrorHandler = (error: Error) => {
  console.error(`${error.message}. Exiting...`)
  process.exit(1)
}
