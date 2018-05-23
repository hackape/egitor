const getIdFactory = () => {
  let _id = 0;
  return () => ++_id;
};
export default getIdFactory;
