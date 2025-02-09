enum UrlKeys {
  FirstName = 'fn',
  LastName = 'ln',
  SongId = 'si'
}

const encrypt = (str: string) => {
  const encoder = new TextEncoder();
  const encodedUint8Array = encoder.encode(str);
  return btoa(String.fromCharCode.apply(null, encodedUint8Array as unknown as number[]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const decrypt = (base64String: string) => {
  const standardBase64String = base64String.replace(/-/g, '+').replace(/_/g, '/');

  const decodedUint8Array = new Uint8Array(
    atob(standardBase64String)
      .split('')
      .map((char) => char.charCodeAt(0))
  );

  const decoder = new TextDecoder();
  return decoder.decode(decodedUint8Array);
};

export const getPropsFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const firstName = params.get(UrlKeys.FirstName) && decrypt(params.get(UrlKeys.FirstName) as string);
  const lastName = params.get(UrlKeys.LastName) && decrypt(params.get(UrlKeys.LastName) as string);
  const songId = params.get(UrlKeys.SongId) && decrypt(params.get(UrlKeys.SongId) as string);
  return { firstName, lastName, songId };
};

export const getUrlFromProps = (baseUrl: string, firstName: string, lastName: string, songId: string) => {
  const url = `${baseUrl}?${UrlKeys.FirstName}=${encrypt(firstName)}&${UrlKeys.LastName}=${encrypt(lastName)}&${
    UrlKeys.SongId
  }=${encrypt(songId)}`;
  return url;
};
