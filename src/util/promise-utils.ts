function to<T>(promise) {
  return promise.then((data: T) => {
     return [null, data];
  }).catch(err => [err]);
};

export default to;