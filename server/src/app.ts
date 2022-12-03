    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controler: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(ErrorMiddleware());
  }

  private initDbConn(): void {
    const { MONGO_URI, MONGO_USER, MONGO_PASS } = process.env;
  }
