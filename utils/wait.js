async function wait(ms) {
  console.log(`waiting ${ms / 1000} seconds `);
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = wait;
