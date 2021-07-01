export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

    get token() {
        // eslint-disable-next-line no-underscore-dangle
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        // eslint-disable-next-line no-underscore-dangle
        return this._token;
    }

}
