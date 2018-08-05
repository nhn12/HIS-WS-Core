export class MongoUtils {
    public static generateSubQueries(tableJoin: string, parentFieldName: string, subField: string, outputField, ext: any[], extCondition?: Object[], nameViewInSub?: string) {
        let result: any = {};
        result.from = tableJoin;
        result['let'] = {};
        result['let'][parentFieldName] = '$' + parentFieldName;

        //
        result['pipeline'] = [];

        // extra subcondition
        let subQueries = { $match: { $expr: { $and: [] } } };
        subQueries.$match.$expr.$and.push({ $eq: ['$' + subField, '$$' + parentFieldName] });

        if (extCondition) {
            extCondition.forEach(element => {
                subQueries.$match.$expr.$and.push(element);
            })
        }
        result['pipeline'].push(subQueries);
        result['as'] = outputField;

        let replaceEle = {};
        replaceEle[outputField] = { $mergeObjects: [{ $arrayElemAt: ["$" + outputField, 0] }] };
        ext.push({ $addFields: replaceEle });

        let reaplce2 = {};
        reaplce2[outputField] = '$' + outputField + '.' + nameViewInSub
        ext.push({ $addFields: reaplce2 });

        return result;
    }

    public static generateJoinTable(tableName, localField, foreignField, outptuField, isLocalFieldMultiple?: boolean) {

        let obj = {
            $lookup:
            {
                from: tableName,
                localField: localField,
                foreignField: foreignField,
                as: outptuField
            }
        }

        if(isLocalFieldMultiple) {
            delete  obj.$lookup.localField;
            delete  obj.$lookup.foreignField;
            obj['$lookup']['let'] = {"local": "$" + localField};
            obj['$lookup']['pipeline'] = [
                {'$match': {'$expr': {'$in': ['$' + foreignField, '$$local']}}}
            ];
        }
        return obj;
    }
}