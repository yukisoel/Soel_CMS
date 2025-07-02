package com.soel.backend.backend.domain.converter

import com.soel.backend.backend.domain.enum.Prefecture
import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter(autoApply = true)
class PrefectureConverter : AttributeConverter<Prefecture, String> {
    override fun convertToDatabaseColumn(attribute: Prefecture?): String? {
        return attribute?.japaneseName
    }

    override fun convertToEntityAttribute(dbData: String?): Prefecture? {
        return dbData?.let { Prefecture.fromValue(it) }
    }
}