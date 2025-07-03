import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    NativeSelect,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {useEffect, useState, memo, ChangeEvent} from "react";
import './Dashboard.css'
import {useTranslation} from 'react-i18next';
import '../base/i18n.js'
import {tagService} from "../detailview/TagService.js";
import {Tag} from "../types/tag.ts";
import { Switch, FormGroup } from '@mui/material';
import {useTheme} from "../context/ThemeContext.tsx";


interface Props {
    onSearch: (params: { search: string; tags: string[]; logicalOp: boolean; sortValue: string }) => void;
}

interface AutocompleteOption {
    label: string;
    id: number;
}

export const DashboardSearch = memo(({onSearch}: Props) => {
    const {themeType} = useTheme();

    const {t} = useTranslation();
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [options_desc, setOptions_desc] = useState<AutocompleteOption[]>([]);
    const [logicalOp, setLogicalOp] = useState(false);
    const [sortValue, setSortValue] = useState('uid');

    useEffect(() => {
        let isMounted = true; // This flag is used to prevent state updates after the component has unmounted
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/instances_metadata?descriptionsCollection`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                data.sort((a: string, b: string) => a.localeCompare(b));
                if (isMounted) {
                    setOptions_desc(data);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Fetch failed:', error);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false; // The cleanup function runs when the component unmounts
        };
    }, []);

    const handleChangeDropdown = (event: SelectChangeEvent) => {
        const {target: {value}} = event;

        if(value != "toggle"){
            const newSelectedTags = typeof value === 'string' ? value.split(',') : value;
            setSelectedTags(newSelectedTags);
        }
    };

    useEffect(() => {
        const fetchDataTag = async () => {
            try {
                const result = await tagService.findAll();
                if (result) {
                    setTags(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataTag();
    }, []);

    useEffect(() => {
        const clearSearch = () => {
            handleClear();
        };

        window.addEventListener('clearSearch', clearSearch);

        return () => {
            window.removeEventListener('clearSearch', clearSearch);
        };
    }, []);


    const toggleLogicalOp = (event:  ChangeEvent<HTMLInputElement>) => {
        setLogicalOp(event?.target?.checked);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortValue(event.target.value);
    };

    // Konnte nicht direkt in "handleSortChange" aufgerufen werden, da ansonsten die sortValue noch nicht aktualisiert worden wäre.
    useEffect(() => {
        if (sortValue) {
            handleSearch();
        }
    }, [sortValue]);

    const handleSearch = ()=> {
        onSearch({search, tags: selectedTags, logicalOp, sortValue});
    };

    const handleClear = () => {
        setSearch("")
        setSelectedTags([])
        onSearch({
            search: "", tags: [], logicalOp: false,
            sortValue: sortValue
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="search" style={{backgroundColor: themeType === 'dark' ? '#333' : '#f7f6f6'}}>
                <Autocomplete onKeyDown={handleKeyDown}
                              size={"small"}
                              freeSolo
                              value={search}
                              id="combo-box-demo"
                              options={options_desc}
                              sx={{width: 300}}
                    // @ts-ignore
                              onChange={(event: Event, newValue: AutocompleteOption) => {
                                  // @ts-ignore
                                  setSearch(newValue ? newValue: '');
                              }}
                    // @ts-ignore
                              onInputChange={(event: Event, newValue: AutocompleteOption) => {
                                  // @ts-ignore
                                  setSearch(newValue ? newValue: '');
                              }}
                              inputValue={search}
                              renderInput={(params) => <TextField {...params} label={t('dashboard.search')}/>}
                />

                <FormControl size="small" sx={{width: 600}}>
                    <InputLabel id="tag">{t('dashboard.tag')}</InputLabel>
                    <Select
                        labelId="dropdown"
                        id="dropdown"
                        multiple
                        // @ts-ignore
                        value={selectedTags} // Funktio niert so, aber noch schauen warum Error
                        onChange={handleChangeDropdown}
                        input={<OutlinedInput label="Tags"/>}
                        renderValue={(selected) =>
                            tags.filter(tagItem => selected.includes(tagItem.id.toString()))
                                .map(item => item.namespace)
                                .join(', ')
                        }
                        MenuProps={MenuProps}>
                        <MenuItem value="toggle" style={{opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
                            <FormGroup row style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Box sx={{marginRight: 1, marginLeft: 2}}>{t('dashboard.or_search')}</Box>
                                <Switch
                                    checked={logicalOp}
                                    onChange={event => {
                                        event.stopPropagation();
                                        toggleLogicalOp(event);
                                    }}
                                />
                                <Box sx={{marginLeft: 1}}>{t('dashboard.and_search')}</Box>
                            </FormGroup>
                        </MenuItem>

                        {tags.map((tagItem) => (
                            <MenuItem key={tagItem.id} value={tagItem.id.toString()}>
                                <Checkbox checked={selectedTags.includes(tagItem.id.toString())}/>
                                <ListItemText primary={tagItem.namespace}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <IconButton id={"searchButton"} size="large" onClick={handleSearch}>
                    <SearchIcon/>
                </IconButton>

                <IconButton id={"searchOffButton"} size="large" onClick={() => handleClear()}>
                    <SearchOffIcon/>
                </IconButton>

                <Box>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            {t('dashboard.sort')}
                        </InputLabel>
                        <NativeSelect
                            defaultValue={"id"}
                            onChange={handleSortChange}
                            inputProps={{
                                name: 'sort',
                                id: 'uncontrolled-native',
                            }}>

                            <option value={"uid"}>{t('dashboard.sortlist.default')}</option>
                            <option value={"hue"}>{t('dashboard.sortlist.hue')}</option>
                            <option value={"brightness"}>{t('dashboard.sortlist.brightness')}</option>
                            <option value={"saturation"}>{t('dashboard.sortlist.saturation')}</option>
                            <option value={"coverage"}>{t('dashboard.sortlist.coverage')}</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
            </div>
        </>
    )
})

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
            width: 150,
        },
    },
}
