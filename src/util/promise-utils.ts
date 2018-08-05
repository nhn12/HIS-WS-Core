function to<T>(promise): Promise<[any | undefined, T | any | undefined]>  {
  return promise.then((data: T) => {
     return [null, data];
  }).catch(err => [err]);
};

export default to;