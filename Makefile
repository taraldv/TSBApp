batchfile=sftpBatchFile
all:
	sftp -b $(batchfile) tsb