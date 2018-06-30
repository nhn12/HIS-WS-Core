export class ParseUtils {
    public static mappingField(arrays: any[], objKey, objKeyField, keyMap, isMulti) {
        if(!arrays || arrays.length <= 0) {
            return [];
        }

        arrays.forEach(element=>{

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
      //  console.log(result);
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

    /**
     * 
     * @param type: 1 service, 2 repository 
     * @param resource: string
     */
    public static convertTableToRepositoryName(resource: string, type: number) {
        if(!resource) {
            return resource;
        }

        resource = resource.replace("_tbl", "");
        if(type == 2) {
            resource += "repository";
        }
        if(type == 1) {
            resource += "service";
        }
        return resource;
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

    public static convertToFormatDateSync(object: any)
    {
        if(!object) {
            return object;
        }
        if(object instanceof String || (typeof object) == 'string') {
            object = new Date(object);
        }
        var day = object.getDate() < 10 ? "0" + object.getDate() : object.getDate();
        var month = object.getMonth() + 1 < 10 ? "0" + (object.getMonth() + 1) : object.getMonth() + 1;
        var year = object.getFullYear();
      
        return year+ "" + month + ""+ day;
        
    }

    
    public static convertToFormatTimeSync(object: any)
    {
        if(!object) {
            return object;
        }
        if(object instanceof String || (typeof object) == 'string') {
            object = new Date(object);
        }
        var minute = object.getMinutes() < 10 ? "0" + object.getMinutes() : object.getMinutes();
        var hour = object.getHours() < 10 ? "0" + (object.getHours() + 1) : object.getHours() + 1;
    
        return hour+ ":" + minute+"";
        
    }
    
}