// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { ItemType } from '../../common/types/core';
import { isBoxCanvas } from '../../utils/file';
import convertToBoxItem from './utils/item';

import { ANYONE_WITH_LINK, ANYONE_IN_COMPANY, PEOPLE_IN_ITEM } from './constants';
import type { accessLevelType, item as itemtype } from './flowTypes';
import messages from './messages';

type Props = {
    accessLevel?: accessLevelType,
    enterpriseName?: string,
    item?: itemtype,
    itemType: ItemType,
};

const SharedLinkAccessDescription = ({ accessLevel, enterpriseName, item, itemType }: Props) => {
    let description;

    switch (accessLevel) {
        case ANYONE_WITH_LINK:
            // TODO: temporary change to support Canvas not being truly public
            if (item && isBoxCanvas(convertToBoxItem(item))) {
                description = messages.canvasPeopleWithLinkDescription;
            } else {
                description = messages.peopleWithLinkDescription;
            }
            break;
        case ANYONE_IN_COMPANY:
            if (itemType === 'folder') {
                description = enterpriseName
                    ? messages.peopleInSpecifiedCompanyCanAccessFolder
                    : messages.peopleInCompanyCanAccessFolder;
            } else {
                description = enterpriseName
                    ? messages.peopleInSpecifiedCompanyCanAccessFile
                    : messages.peopleInCompanyCanAccessFile;
            }
            break;
        case PEOPLE_IN_ITEM:
            description =
                itemType === 'folder' ? messages.peopleInItemCanAccessFolder : messages.peopleInItemCanAccessFile;
            break;
        default:
            return null;
    }

    return (
        <small className="usm-menu-description">
            <FormattedMessage {...description} values={{ company: enterpriseName }} />
        </small>
    );
};

export default SharedLinkAccessDescription;
