export default (app) => {
    app.get('/', (req, res, next) => {
      res.end('Timelash API Here');
    });
}