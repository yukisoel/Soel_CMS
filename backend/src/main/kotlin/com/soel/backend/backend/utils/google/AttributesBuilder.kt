package com.soel.backend.backend.utils.google

import com.soel.backend.backend.model.GoogleLocationAttribute
import com.soel.backend.backend.model.GoogleLocationAttributeUriValue
import com.soel.backend.backend.model.GoogleLocationAttributeValueType
import com.soel.backend.backend.model.GoogleLocationAttributesModel

class AttributesBuilder{
    private var attributes: List<GoogleLocationAttribute>? = null

    fun snsLink(attributeName: String, snsUrl: String) = apply {
        this.attributes = listOf(
            GoogleLocationAttribute(
                name = attributeName,
                valueType = GoogleLocationAttributeValueType.URL,
                uriValues = listOf(
                    GoogleLocationAttributeUriValue(
                        uri = snsUrl
                    )
                ),
            )
        )
    }

    fun menuLink(attributeName: String, menuUrl: String) = apply {
        this.attributes = listOf(
            GoogleLocationAttribute(
                name = attributeName,
                valueType = GoogleLocationAttributeValueType.URL,
                uriValues = listOf(
                    GoogleLocationAttributeUriValue(
                        uri = menuUrl
                    )
                ),
            )
        )
    }

    fun build(): GoogleLocationAttributesModel {
        return GoogleLocationAttributesModel(
            attributes = attributes
        )
    }

    companion object {
        fun builder() = AttributesBuilder()
    }
}