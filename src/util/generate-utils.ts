function generateCode(id: string, length: number, prefix?: string): string {
        if(!prefix) {
            prefix = "";
        }

        if((prefix.length + id.length) >= length) {
            return prefix + id;
        }

        while((prefix.length + id.length) < length) {
            id = '0' + id; 
        }

        return prefix + id;
}

 export default generateCode;