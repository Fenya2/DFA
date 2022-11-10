export default class DFA
{
    constructor(pattern)
    {
        if(pattern === "")
            return null;
        this.state = 0;
        this.pattern_length = pattern.length;
        this.terminateState = pattern.length;
        this._prefix_func = this.create_prefix_function(pattern);
    }

    create_prefix_function(str)
    {
        let prefix_function_table = {};
        for(let i = 0; i < str.length; i++)
        {
            if(!prefix_function_table.hasOwnProperty(str[i]))
                prefix_function_table[str[i]] = [];
        }

        let str_of_state = "";
        let max_suffix = 0;
        for(let i of str) // ищем очередной максимальный суффикс, являющийся префиксом заданного слова str
        {
            str_of_state += i;
            for(let j of Object.keys(prefix_function_table))
            {
                max_suffix = 0;
                for(let k = (str_of_state+j).length - 1; k >= 0; k--)
                {
                    if(str.slice(0, (str_of_state+j).slice(k).length) === (str_of_state+j).slice(k))
                        max_suffix = (str_of_state+j).slice(k).length;
                }
                prefix_function_table[j].push(max_suffix);
            }
        }

        prefix_function_table.start_sym = str[0];
        console.log(prefix_function_table);

        return function (state ,sym) { // Замыкание)))

            if(!prefix_function_table.hasOwnProperty(sym))
                return 0;
            if(state === 0 && sym !== prefix_function_table.start_sym)
                return 0;
            if(state === 0 && sym === prefix_function_table.start_sym)
                return 1;
            return prefix_function_table[sym][state - 1];
        }
    }

    findMatches(str)
    {
        if(str === "")
            return null;
        let matches = [];
        for(let i = 0; i < str.length; i++)
        {
            this.state = this._prefix_func(this.state, str[i]);
            //console.log(str[i], this.state);
            if(this.state === this.terminateState)
                matches.push(i - this.pattern_length + 1);
        }
        this.state = 0;
        return matches;
    }
}