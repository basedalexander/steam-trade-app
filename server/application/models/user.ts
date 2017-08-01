import * as mongoose from 'mongoose';

export interface IUserModel {
    steamID: string;
    tradeUrl?: string;
    admin?: boolean;
}

var UserSchema = new mongoose.Schema({
    steamID: String,
    tradeUrl: String,
    admin: Boolean
});

UserSchema.methods.toJSON = function () {
    var user = this.toObject();
    return user;
};

export let User = mongoose.model('User', UserSchema);