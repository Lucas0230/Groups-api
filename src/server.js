import server from './app';

server.listen(process.env.PORT, () =>
    console.log(`API START ${process.env.PORT}`));
