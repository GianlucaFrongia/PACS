import './DetailView.css'
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import '../base/i18n.js'
import {useEffect, useState} from "react";
import {tagService} from "../detailview/TagService.js";
import {dataService} from "../dashboard/DataService.js";
import {Tag} from "../types/tag.ts";
import {Instance} from "../types/instance.ts";

interface Props{
    instance: Instance
}

export const DetailViewTags = ({ instance }: Props) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [data, setData] = useState<Instance>();

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
        const fetchData = async () => {
            try {
                const result = await dataService.findByUid(instance.instanceMetaData.uid);
                if (result) {
                    setData(result.data);
                    if (result.data.instanceMetaData.tags) {
                        setSelectedTags(result.data.instanceMetaData.tags.map((tag: Tag) => tag.id.toString()));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleChangeDropdown = (event: SelectChangeEvent) => {
        const {target: {value}} = event;

        const newSelectedTags = typeof value === 'string' ? value.split(',') : value;
        const addedTags = newSelectedTags.filter(tag => !selectedTags.includes(tag));
        const removedTags = selectedTags.filter(tag => !newSelectedTags.includes(tag));
        setSelectedTags(newSelectedTags);

        if (data) {
            addedTags.forEach((tag_id: string) => {
                tagService.save(data.instanceMetaData.uid, tag_id)
            });
            removedTags.forEach((tag_id: string) => {
                tagService.remove(data.instanceMetaData.uid, tag_id)
            });
        }
    };

    return (
        <div className="tags" style={{ display: 'flex', width: '100%' }}>
            {<FormControl size="small" sx={{ flexGrow: 1 }}>
                <InputLabel id="tag-checkbox">Tag</InputLabel>
                <Select
                    labelId="Tags"
                    id="multiple-checkbox"
                    multiple
                    // @ts-expect-error
                    value={selectedTags} // Funktioniert so, aber noch schauen warum Error
                    onChange={handleChangeDropdown}
                    input={<OutlinedInput label="Tag"/>}
                    renderValue={(selected) =>
                        tags.filter(tagItem => selected.includes(tagItem.id.toString()))
                            .map(item => item.namespace)
                            .join(', ')
                    }
                    MenuProps={MenuProps}
                >
                    {tags.map((tagItem) => (
                        <MenuItem key={tagItem.id} value={tagItem.id.toString()}>
                            <Checkbox checked={selectedTags.includes(tagItem.id.toString())}/>
                            <ListItemText primary={tagItem.namespace}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>}
        </div>
    );
};

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        },
    },
};