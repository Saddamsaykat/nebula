export const downloadFile = (
    fileBlob: BlobPart | Blob,
    fileName: string,
  ): void => {
    if (!fileBlob) {
      console.error('File Blob is not available.');
      return;
    }
  
    const url = window.URL.createObjectURL(new Blob([fileBlob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  