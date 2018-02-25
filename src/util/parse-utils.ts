export class ParseUtils {
    public static mappingField(arrays: any[], objKey, objKeyField, keyMap, isMulti) {
        if(!arrays || arrays.length <= 0) {
            return [];
        }

        arrays.forEach(element=>{
            console.log(element[objKey]);

            if(element[objKey] && element[objKey].length > 0) {

                if(!isMulti) {
                    element[keyMap] = element[objKey][0][objKeyField];
                } else {
                    element[keyMap] = element[objKey][objKeyField].map(value=>{
                        return value[objKeyField];
                    })
                }
            }
        })
        return arrays;
    }
}