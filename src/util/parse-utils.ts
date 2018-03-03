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

    public static mappingDateToHoursString(data: any[], field, targetField) {
        if(!data) {
            return data;
        }

        data.forEach(element=>{
            element[targetField] = ParseUtils.convertTimeToHoursString(element[field]);
        })

        return data;
    }

    public static convertStringTime(timeString: String, dataExists?: Date) {
        let abc = timeString.split(":");

        let result = new Date();
        if(dataExists) { 
            result = new Date(dataExists.getTime());
        } else {
            result = new Date();
        }
        result.setHours(parseInt(abc[0]));
        result.setMinutes(parseInt(abc[1]));
        return result;
    }

    public static convertTimeToHoursString(data: Date) {
        if((typeof data) == 'string') {
            data = new Date(data);
        }
        let results: string = "";
        if(!data) {
            return null;
        }

        results += data.getHours() <= 9 ? '0' +  data.getHours() : '' +  data.getHours();
        results += ":";
        results += data.getMinutes() <= 9 ? '0' +  data.getMinutes() : '' +  data.getMinutes();
        return results;
    }

    public static splitDate(date1: Date, date2: Date): Date[] {
        if((typeof date1) == "string") {
            date1 = new Date(date1);
        }
        if((typeof date2) == "string") {
            date2 = new Date(date2);
        }

        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0 ,0);

        if(date1.getTime() == date2.getTime()) {
            console.log(date1);
            return [date1];
        }

        if(date1.getTime() > date2.getTime()) {
            let t = date1;
            date1 = date2;
            date2 = t;
        }
        let results = [];
        for(let i = date1.getTime(); i<= date2.getTime(); i+=(24*60*60*1000)) {
            results.push(new Date(i));
        }

        return results;
        
    }
}