const prod = {
  url: {
   API_URL: 'https://p3hntfqq4d.execute-api.us-east-1.amazonaws.com',
  },
};
 const dev = {
  url: {
   API_URL: 'http://localhost:4200',
  }
 };

 export const config = process.env.REACT_APP_ENVIRONMENT === 'development' ? dev : prod;