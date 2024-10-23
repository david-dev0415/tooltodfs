class Queries {

  static checkBackupSpace () {
    console.log('Checking backup space...')
  }

  static viewLogs () {
    console.log('Viewing logs...')
  }

  static cleanLogs () {
    console.log('Cleaning logs...')
    const query = `
      DBCC SHRINKDATABASE (DFS, TRUNCATEONLY);

      USE DFS;
      GO
      ALTER DATABASE DFS
      SET RECOVERY SIMPLE;
      GO

      DBCC SHRINKFILE(DFS_Log, 1);
      GO

      ALTER DATABASE DFS
      SET RECOVERY FULL;
    `
    return query
  }

  static cleanDespachosAntiguos () {
    console.log('Cleaning old despachos...')
  }

}

export default Queries