export const cleanLogs = `
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